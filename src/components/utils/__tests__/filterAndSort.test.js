import filterAndSort from 'components/utils/filterAndSort';

import normalizedRestaurants from './data/restaurants-normalized.data.json';

describe('sorting', () => {
  it('does not sort restaurants when none is selected', () => {
    const result = filterAndSort({ sort: 'none' }, normalizedRestaurants);
    expect(result.map(x => x.name)).toEqual([
      'Tre Xanh', 'Taste of India', 'Burger Galaxy', 'Essence of India',
      'Manjodh', 'Bayram Grillhaus Halal', 'iiu Sushi Asia Food',
      'Vapiano - Alexanderplatz', 'Punjabi Traka',
    ]);
  });

  it('sorts restaurants by name ascending on name-asc', () => {
    const result = filterAndSort({ sort: 'name-asc' }, normalizedRestaurants);
    expect(result.map(x => x.name)).toEqual([
      'Bayram Grillhaus Halal', 'Burger Galaxy', 'Essence of India',
      'iiu Sushi Asia Food', 'Manjodh', 'Punjabi Traka',
      'Taste of India', 'Tre Xanh', 'Vapiano - Alexanderplatz',
    ]);
  });

  it('sorts restaurants by name descending on name-desc', () => {
    const result = filterAndSort({ sort: 'name-desc' }, normalizedRestaurants);
    expect(result.map(x => x.name)).toEqual([
      'Vapiano - Alexanderplatz', 'Tre Xanh', 'Taste of India',
      'Punjabi Traka', 'Manjodh', 'iiu Sushi Asia Food',
      'Essence of India', 'Burger Galaxy', 'Bayram Grillhaus Halal',
    ]);
  });

  it('sorts restaurants by rating ascending on rating-asc', () => {
    const result = filterAndSort(
      { sort: 'rating-asc' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.rating.average)).toEqual([
      1.7, 2, 2.2, 2.5, 2.8, 3.6, 4, 4.4, 4.7
    ]);
  });

  it('sorts restaurants by rating descending on rating-desc', () => {
    const result = filterAndSort(
      { sort: 'rating-desc' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.rating.average)).toEqual([
      4.7, 4.4, 4, 3.6, 2.8, 2.5, 2.2, 2, 1.7
    ]);
  });

  it('sorts restaurants by min order ascending on min-order-asc', () => {
    const result = filterAndSort(
      { sort: 'min-order-asc' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.minOrderValue)).toEqual([
      3, 4, 4, 8, 8, 9, 11, 12, 15
    ]);
  });

  it('sorts restaurants by min order descending on min-order-desc', () => {
    const result = filterAndSort(
      { sort: 'min-order-desc' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.minOrderValue)).toEqual([
      15, 12, 11, 9, 8, 8, 4, 4, 3
    ]);
  });
});

describe('filter', () => {
  it('does not filter on empty queryParams', () => {
    const result = filterAndSort({}, normalizedRestaurants);
    expect(result.map(x => x.id)).toEqual([
      '40182', '27693', '17919', '38010', '30951', '16290',
      '13032', '5430', '25521',
    ]);
  });

  it('filters restaurants by value of open', () => {
    const result = filterAndSort(
      { open: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual([
      '40182', '27693', '17919', '38010', '16290', '25521'
    ]);
  });

  it('filters restaurants by value of reachable', () => {
    const result = filterAndSort(
      { reachable: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual([
      '40182', '27693', '16290', '13032', '25521'
    ]);
  });

  it('filters restaurants by value of online', () => {
    const result = filterAndSort(
      { online: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual([
      '40182', '27693', '17919', '38010', '30951', '13032', '5430'
    ]);
  });

  it('filters restaurants by a single category', () => {
    const result = filterAndSort(
      { indisch: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual(['40182', '27693', '30951']);
  });

  it('filters restaurants by multiple categories, in an or fashion', () => {
    const result = filterAndSort(
      { indisch: true, doner: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual(['40182', '27693', '30951', '25521']);
  });

  it('filters restaurants by a single tag', () => {
    const result = filterAndSort(
      { coupon: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual([
      '27693', '17919', '30951', '16290', '5430', '25521'
    ]);
  });

  it('filters restaurants by multiple tags, in an or fashion', () => {
    const result = filterAndSort(
      { coupon: true, online_payment: true },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual([
      '40182', '27693', '17919', '30951', '16290', '13032', '5430', '25521',
    ]);
  });

  it('filters restaurants by substring of name, ignoring case', () => {
    const result = filterAndSort(
      { name: 'india' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual(['27693', '38010']);
  });

  it('filters restaurants by zipcode', () => {
    const result = filterAndSort({ zipcode: '12345' }, normalizedRestaurants);
    expect(result.map(x => x.id)).toEqual(['13032', '5430']);
  });

  it('filters by rating', () => {
    const result = filterAndSort({ rating: '4' }, normalizedRestaurants);
    expect(result.map(x => x.id)).toEqual(['27693', '17919', '5430']);
  });

  it('filters by minOrderValue', () => {
    const result = filterAndSort({ minorder: '9' }, normalizedRestaurants);
    expect(result.map(x => x.id)).toEqual(['17919', '38010', '30951', '5430']);
  });

  it('filters restaurants by substring of street name, ignoring case', () => {
    const result = filterAndSort(
      { streetname: 'friedrich' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual(['25521']);
  });

  it('filters by streetNumber, ignoring case', () => {
    const result = filterAndSort(
      { streetnumber: '9a' },
      normalizedRestaurants,
    );
    expect(result.map(x => x.id)).toEqual(['25521']);
  });
});
