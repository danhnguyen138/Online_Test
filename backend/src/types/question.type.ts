import Answer from './answer.type';

type Question = {
  description: string;
  answers: Answer[] | undefined | null;
};

export default Question;
