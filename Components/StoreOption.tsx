export const StoreOption = ({ foodName }: { foodName: string }) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <p className="text-4xl mb-[10px]">{foodName}</p>
        <div className="w-full h-[1px] bg-gray-500 my-[5px]"></div>
      </div>
    </>
  );
};
