import MotionDivMT from "@/components/transitions/MotionDivMT";

const NoteStatusSection = ({
  code,
  noteExists,
}: {
  code: string;
  noteExists: boolean;
}) => {
  const TEXT_COLOR_CLASSES = "text-primary";

  const title = noteExists ? (
    <span>
      Your code <span className={TEXT_COLOR_CLASSES}>{code}</span> found this
      existing note.
    </span>
  ) : (
    <span>
      Your code <span className={TEXT_COLOR_CLASSES}>{code}</span> has never
      been used
    </span>
  );

  const subtitle = noteExists
    ? " You can edit, erase and save your changes."
    : "After saving use the same code to open our notes again.";

  return (
    <MotionDivMT>
      <section className="max-w-2xl py-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8">{subtitle}</p>
      </section>
    </MotionDivMT>
  );
};

export default NoteStatusSection;
