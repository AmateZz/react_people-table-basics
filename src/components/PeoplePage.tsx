import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleList } from './PeopleList';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: string;
  father: string;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setLoading(false);

        setPeople(fetchedPeople);
      })
      .catch(() => {
        setLoading(false);

        setError('Something went wrong');
      });
  }, []);

  if (error === '') {
    return <PeopleList people={people} isLoading={loading} />;
  } else if (error !== '') {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </div>
    );
  }
};
