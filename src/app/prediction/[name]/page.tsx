import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${name}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

const getPredictedNationality = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};

interface Params {
  params: { name: string };
}

export default async function Page({ params }: Params) {
  const ageData = getPredictedAge(params.name);
  const genderData = getPredictedGender(params.name);
  const nationalityData = getPredictedNationality(params.name);

  const [age, gender, nationality] = await Promise.all([
    ageData,
    genderData,
    nationalityData,
  ]);

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Personal Info
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            Age: {age?.age}
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            Gender: {gender?.gender}
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            Nationality: {nationality?.country[0]?.country_id}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-center">
        <Link
          href="/"
          className="w-[30%] mx-auto py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Try again
        </Link>
      </div>
    </>
  );
}
