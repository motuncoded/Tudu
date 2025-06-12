import React from "react";

const HeroNumber = ({ number, words, styles, id }) => {
  return (
    <div className="text-center" aria-labelledby={id}>
      <h2
        id={id}
        className={`text-4xl font-bold ${styles} mb-2`}
        aria-label={`${number} ${words}`}
      >
        {number}
      </h2>
      <p className="text-gray-300 text-lg" aria-hidden="true">
        {words}
      </p>
    </div>
  );
};

const HeroNumbers = () => {
  return (
    <section
      aria-label="Achievement metrics"
      className="bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center rounded-md p-6 xl:p-8"
    >
      <HeroNumber
        number="150+"
        words="Sample Todos"
        styles="text-blue-400"
        id="todos-count"
      />
      <HeroNumber
        number="10"
        words="Items Per Page"
        styles="text-green-400"
        id="items-per-page"
      />
      <HeroNumber
        number="100%"
        words="Responsive"
        styles="text-purple-400"
        id="responsive-percentage"
      />
    </section>
  );
};

export default HeroNumbers;
