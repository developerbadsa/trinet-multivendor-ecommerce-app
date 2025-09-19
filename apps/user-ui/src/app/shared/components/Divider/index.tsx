type Props = {
  children: React.ReactNode;
};

const SectionDivider = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2 py-4">
      <div className="flex-1 border-t border-gray-300" />
      <span className="">{children}</span>
      <div className="flex-1 border-t border-gray-300" />
    </div>
  );
};

export default SectionDivider;
