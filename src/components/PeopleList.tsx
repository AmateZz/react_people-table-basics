import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from './Loader';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
};

type PeopleListProps = {
  people: Person[];
  isLoading: boolean;
};

export const PeopleList = ({ people, isLoading }: PeopleListProps) => {
  const getHrefMother = (person: Person): string => {
    const motherPerson = people.find(per => per.name === person.motherName);
    const motherHref = motherPerson?.slug;

    return motherHref ? motherHref : ``;
  };

  const getHrefFather = (person: Person): string => {
    const fatherPerson = people.find(per => per.name === person.fatherName);
    const fatherHref = fatherPerson?.slug;

    return fatherHref ? fatherHref : ``;
  };

  const { pathname } = useLocation();

  return isLoading ? (
    <>
      <h1 className="title">People Page</h1>
      <Loader />
    </>
  ) : (
    <>
      <h1 className="title">People Page</h1>
      {people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      <div className="container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.name}
                className={classNames({
                  'has-background-warning':
                    `/people/${person.slug}` === pathname,
                })}
              >
                <td>
                  <Link
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                    to={`${person.slug}`}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>
                  {!getHrefMother(person) && !person.motherName && '-'}
                  {person.motherName &&
                    !getHrefMother(person) &&
                    person.motherName}
                  {getHrefMother(person) && (
                    <Link
                      className="has-text-danger"
                      to={`${getHrefMother(person)}`}
                    >
                      {person.motherName}
                    </Link>
                  )}
                </td>

                <td>
                  {!getHrefFather(person) && !person.fatherName && '-'}
                  {person.fatherName &&
                    !getHrefFather(person) &&
                    person.fatherName}
                  {getHrefFather(person) && (
                    <Link to={`${getHrefFather(person)}`}>
                      {person.fatherName || `-`}
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
