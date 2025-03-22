import { render, screen, within } from '@testing-library/react-native'

import { RepositoryListContainer } from './RepositoryList'

describe('RepositoryListContainer', () => {
  it('renders a repositories when present', () => {
    const data = {
      repositories: {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      },
    }

    render(<RepositoryListContainer data={data} loading={false} error={undefined} />)

    const repositoryItems = screen.getAllByTestId('repositoryItem')
    const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

    const firstItem = within(firstRepositoryItem)
    expect(firstItem.getByText('jaredpalmer/formik')).toBeDefined()
    expect(firstItem.getByText('Build forms in React, without the tears')).toBeDefined()
    expect(firstItem.getByText('1.6k')).toBeDefined()

    const secondItem = within(secondRepositoryItem)
    expect(secondItem.getByText('async-library/react-async')).toBeDefined()
    expect(secondItem.getByText('Flexible promise-based React data loader')).toBeDefined()
    expect(secondItem.getByText('69')).toBeDefined()
  })

  it('renders loading text', () => {
    render(<RepositoryListContainer data={undefined} loading={true} error={undefined} />)

    expect(screen.getByText('Loading...')).toBeDefined()
  })
})
