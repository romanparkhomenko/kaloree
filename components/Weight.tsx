import React from "react";
import Router from "next/router";

export type WeightProps = {
  date: string | null;
  id: number;
  pounds: number;
};

const Weight: React.FC<{ weight: WeightProps }> = ({ weight }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${weight.id}`)}>
      <h2>Pounds: {weight.pounds}lbs</h2>
      <h2>Date: {weight.date}</h2>
    </div>
  );
};

export default Weight;
