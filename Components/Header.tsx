export const Header = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-between border-b-2 border-solid w-full pb-2">
      <h2 className="inline text-5xl">{text}</h2>
    </div>
  );
};
