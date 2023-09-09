import React from "react";

interface Params {
  params: { name: string };
}

export default function Page({ params }: Params) {
  return (
    <div>
      <p>name</p>
      <p>{params.name}</p>
    </div>
  );
}
