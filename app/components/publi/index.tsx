import { PropsWithChildren } from "react";

export const PubliWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-screen h-full">
      <PubliTop />
      <div className="flex h-full w-screen m-0">
        <PubliLeft />
        {children}
        <PubliRight />
      </div>
      <PubliBottom />
    </div>
  );
};

export const PubliTop = () => {
  return <div className="w-full h-32"></div>;
};
export const PubliLeft = () => {
  return <div className="hidden lg:block lg:w-[25%] h-full "></div>;
};
export const PubliRight = () => {
  return <div className="hidden lg:block lg:w-[25%] h-full "></div>;
};
export const PubliBottom = () => {
  return <div className=" w-full h-64" />;
};
