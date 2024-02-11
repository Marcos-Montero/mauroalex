import React from "react";

import Image from "next/image";

const HanmaIcon = ({ imgClassName }: { imgClassName?: string }) => {
  return (
    <Image
      alt="Hanma club web logo"
      src="/hanmaLogo4-nobg.svg"
      height={24}
      width={24}
      className={`${imgClassName}`}
    />
  );
};

export default HanmaIcon;
