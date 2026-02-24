import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ label, title, description, align = "center" }: SectionHeaderProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl mb-14 ${alignment}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary text-sm font-semibold tracking-widest uppercase mb-3 block"
        >
          {label}
        </motion.span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
