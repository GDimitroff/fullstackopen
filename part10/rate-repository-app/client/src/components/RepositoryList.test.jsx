import { render, screen } from '@testing-library/react-native'

import { RepositoryListContainer } from './RepositoryList'

describe('RepositoryListContainer', () => {
  it('renders a repositories when present', () => {
    const data = {
      repositories: {
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
              stargazersCount: 2156,
              forksCount: 44,
              reviewCount: 1,
              ratingAverage: 88,
            },
          },
        ],
      },
    }

    render(<RepositoryListContainer data={data} loading={false} error={undefined} />)

    expect(screen.getByText('jaredpalmer/formik')).toBeDefined()
    expect(screen.getByText('Build forms in React, without the tears')).toBeDefined()
    expect(screen.getByText('2.2k')).toBeDefined()
  })

  it('renders loading text', () => {
    render(<RepositoryListContainer data={undefined} loading={true} error={undefined} />)

    expect(screen.getByText('Loading...')).toBeDefined()
  })
})
