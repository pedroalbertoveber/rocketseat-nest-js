import { Slug } from './slug'

test('Shoud be able to create a new slug from text', () => {
  const slugText = Slug.createFromText('An example test')
  expect(slugText.value).toEqual('an-example-test')
})
