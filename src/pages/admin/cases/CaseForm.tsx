import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { CASES, CaseStudy } from "@/data/portfolioData";
import { notifyPortfolioDataUpdated } from "@/lib/portfolioDataSync";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowLeft, Trash2, Plus, GripVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const formSchema = z.object({
  id: z.string().min(2, { message: "ID/Slug is required." }),
  client: z.string().min(2, { message: "Client name is required." }),
  title: z.string().min(5, { message: "Headline title is required." }),
  tag: z.string().min(2, { message: "Tag/Domain is required." }),
  year: z.string().min(2, { message: "Year is required." }),
  role: z.string().min(2, { message: "Role is required." }),
  duration: z.string().min(2, { message: "Duration is required." }),
  summary: z.string().min(10, { message: "Short summary is required." }),
  overview: z.string().min(10, { message: "Overview is required." }),
  challenge: z.string().min(10, { message: "Challenge statement is required." }),
  outcome: z.array(z.object({ text: z.string().min(1, "Outcome text required") })).min(1, "At least one outcome required"),
});

export default function CaseForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      client: "",
      title: "",
      tag: "Brand identity",
      year: new Date().getFullYear().toString(),
      role: "Brand designer",
      duration: "4 weeks",
      summary: "",
      overview: "",
      challenge: "",
      outcome: [
        { text: "A single identity system used consistently across every touchpoint" },
        { text: "Guidelines that let the internal team produce on-brand assets independently" },
      ],
    },
  });

  const { fields: outcomeFields, append: appendOutcome, remove: removeOutcome, move: moveOutcome } = useFieldArray({
    control: form.control,
    name: "outcome",
  });

  const onDragEndOutcome = (result: DropResult) => {
    if (!result.destination) return;
    moveOutcome(result.source.index, result.destination.index);
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  const fetchCase = async () => {
    setLoading(true);
    if (isEditing) {
      let found: CaseStudy | undefined;

      // Try Supabase first
      try {
        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("id", id)
          .single();
        if (!error && data) {
          found = data;
        }
      } catch {
        // Fall through
      }

      // If not in Supabase, check localStorage or static CASES
      if (!found) {
        const stored = localStorage.getItem("admin_cases");
        const list: CaseStudy[] = stored ? JSON.parse(stored) : CASES;
        found = list.find((c) => c.id === id);
      }

      if (found) {
        form.reset({
          id: found.id,
          client: found.client,
          title: found.title,
          tag: found.tag,
          year: found.year,
          role: found.role,
          duration: found.duration,
          summary: found.summary,
          overview: found.overview,
          challenge: found.challenge,
          outcome: Array.isArray(found.outcome)
            ? found.outcome.map((t: string | { text: string }) =>
                typeof t === "string" ? { text: t } : t
              )
            : [{ text: "" }],
        });
      } else {
        toast({
          variant: "destructive",
          title: "Case study not found",
        });
        navigate("/admin/cases");
      }
    }
    setLoading(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedData: CaseStudy = {
      ...values,
      outcome: values.outcome.map((o) => o.text),
    };

    try {
      // Attempt saving to Supabase
      if (isEditing) {
        await supabase.from("case_studies").update(formattedData).eq("id", id);
      } else {
        await supabase.from("case_studies").insert([formattedData]);
      }
    } catch {
      // Local fallback handled below
    }

    // Always keep localStorage sync for seamless preview & offline fallback
    const stored = localStorage.getItem("admin_cases");
    let list: CaseStudy[] = stored ? JSON.parse(stored) : [...CASES];

    if (isEditing) {
      list = list.map((c) => (c.id === id ? formattedData : c));
    } else {
      list = [formattedData, ...list];
    }
    localStorage.setItem("admin_cases", JSON.stringify(list));
    notifyPortfolioDataUpdated();

    toast({
      title: isEditing ? "Case study updated successfully" : "Case study created successfully",
    });
    navigate("/admin/cases");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/admin/cases">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Case Study" : "Create Case Study"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure the case study narrative, challenge, and measurable outcomes.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Core Information */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-2">Core Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client / Brand Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Taxverse"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!isEditing && !form.formState.dirtyFields.id) {
                            form.setValue(
                              "id",
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)+/g, "")
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier / Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. taxverse" {...field} />
                    </FormControl>
                    <FormDescription>Used in URL (/cases/taxverse)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Making tax consultancy feel human." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-4">
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag / Domain</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Brand identity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Brand designer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 4 weeks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Summary (for card preview)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Repositioning a business consultancy with a calm, trustworthy identity system..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 2: Narrative Deep Dive */}
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-2">Narrative & Strategy</h2>

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the context and background of the project in detail..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="challenge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>The Challenge / Problem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain what was broken or what obstacles the team faced..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Section 3: Outcomes / Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-base font-semibold">Measurable Outcomes & Key Results</FormLabel>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Add bullet points highlighting what was delivered and achieved.
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => appendOutcome({ text: "" })}>
                  <Plus className="mr-2 h-4 w-4" /> Add Outcome
                </Button>
              </div>

              <DragDropContext onDragEnd={onDragEndOutcome}>
                <Droppable droppableId="outcomes-list">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {outcomeFields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex gap-2 items-start ${snapshot.isDragging ? "opacity-75 z-50 relative" : ""}`}
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="mt-3 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                              >
                                <GripVertical className="h-4 w-4" />
                              </div>
                              <FormField
                                control={form.control}
                                name={`outcome.${index}.text`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input placeholder={`Outcome ${index + 1}...`} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive mt-0.5"
                                onClick={() => removeOutcome(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-12">
            <Button type="button" variant="outline" asChild>
              <Link to="/admin/cases">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Case Study
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
