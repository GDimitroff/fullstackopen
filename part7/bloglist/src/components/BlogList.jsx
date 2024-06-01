import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { useBlogsQuery } from '../queries/blogQueries'

const BlogList = () => {
  const { data: blogs, isLoading } = useBlogsQuery()

  const sortedBlogs = blogs?.sort((a, b) => b.likes - a.likes)

  if (isLoading) return <div>loading...</div>

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align='right'>Author</TableCell>
            <TableCell align='right'>Comments</TableCell>
            <TableCell align='right'>Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell align='right'>{blog.author}</TableCell>
              <TableCell align='right'>{blog.comments.length}</TableCell>
              <TableCell align='right'>{blog.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
