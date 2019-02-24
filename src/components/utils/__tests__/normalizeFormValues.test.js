import normalizeFormValues from 'components/utils/normalizeFormValues';

it('returns form values on correct name', () => {
  const path = normalizeFormValues({ name: 'test' });
  expect(path).toEqual({ name: 'test' });
});

it('omits name on empty', () => {
  const path = normalizeFormValues({ name: '' });
  expect(path).toEqual({});
});

it('returns form values on correct streetname', () => {
  const path = normalizeFormValues({ streetname: 'test' });
  expect(path).toEqual({ streetname: 'test' });
});

it('omits streetname on empty', () => {
  const path = normalizeFormValues({ streetname: '' });
  expect(path).toEqual({});
});

it('returns form values on correct streetnumber', () => {
  const path = normalizeFormValues({ streetnumber: 'test' });
  expect(path).toEqual({ streetnumber: 'test' });
});

it('omits streetnumber on empty', () => {
  const path = normalizeFormValues({ streetnumber: '' });
  expect(path).toEqual({});
});

it('returns form values on correct zipcode', () => {
  const path = normalizeFormValues({ zipcode: 'test' });
  expect(path).toEqual({ zipcode: 'test' });
});

it('omits zipcode on empty', () => {
  const path = normalizeFormValues({ zipcode: '' });
  expect(path).toEqual({});
});

it('returns form values on correct rating', () => {
  const path = normalizeFormValues({ rating: '3' });
  expect(path).toEqual({ rating: '3' });
});

it('omits rating from url when not a number', () => {
  const path = normalizeFormValues({ rating: 'none' });
  expect(path).toEqual({});
});

it('returns form values on correct minorder', () => {
  const path = normalizeFormValues({ minorder: '3' });
  expect(path).toEqual({ minorder: '3' });
});

it('omits minimum order from url when not a number', () => {
  const path = normalizeFormValues({ minorder: 'none' });
  expect(path).toEqual({});
});

it('returns form values on correct status', () => {
  const path = normalizeFormValues({ open: true, reachable: true });
  expect(path).toEqual({ status: 'open,reachable' });
});

it('creates correct url with categories', () => {
  const path = normalizeFormValues(
    { indisch: true, doner: true },
  );
  expect(path).toEqual({ categories: 'doner,indisch' });
});

it('creates correct url with tags', () => {
  const path = normalizeFormValues(
    { 'delivery_home': true, 'delivery_pickup': true },
  );
  expect(path).toEqual({ tags: 'delivery_home,delivery_pickup' });
});
