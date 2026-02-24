export type CourseData = {
  title: string;
  transformation: string;
  audience: string;
  problem: string;
  modules: string;
  bonus?: string;
  price: string;
};

export type ParsedModule = {
  number: number;
  rawTitle: string;
  cleanTitle: string;
  icon: string;
};
