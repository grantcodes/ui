import React from 'react'
import { Card } from './Card'
import { CardContent } from './CardContent'
import { CardActions } from './CardActions'
import { CardMeta } from './CardMeta'
import { CardMetaItem } from './CardMetaItem'
import { Button } from '../Button'

export default {
  title: 'Card',
}

export const StandardCard = ({ content }) => (
  <Card>
    <CardContent>{content}</CardContent>
  </Card>
)

StandardCard.args = { content: <p>This is a basic text card</p> }

export const WithActions = ({ content }) => (
  <Card>
    <CardContent>{content}</CardContent>
    <CardActions>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </CardActions>
  </Card>
)

WithActions.args = {
  content: <p>This is a card with actions</p>,
}

export const WithMeta = ({ content }) => (
  <Card>
    <CardContent>{content}</CardContent>
    <CardMeta>
      <CardMetaItem title="Posted Date">
        <time dateTime="2000-12-25">2 days ago</time>
      </CardMetaItem>
      <CardMetaItem title="Author">Grant Richmond</CardMetaItem>
    </CardMeta>
  </Card>
)

WithMeta.args = {
  content: <p>This is a card with some meta attached</p>,
}

export const FullCard = () => (
  <Card>
    <img
      src="https://placeimg.com/500/200"
      width="500"
      height="200"
      alt="Card image"
    />
    <CardContent>
      <h2>Fully Setup Card</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus
        asperiores fuga cumque, laboriosam earum dignissimos. Beatae ex quis
        laboriosam aliquam debitis vero, fugit voluptates. Beatae possimus neque
        esse? Aliquam.
      </p>
      <p>
        Perspiciatis similique esse recusandae magni nisi voluptas, cum
        perferendis expedita ut eaque sapiente aliquam. Culpa, fuga veritatis.
        Obcaecati illo et quidem eos? Natus dolores blanditiis sit nesciunt
        dolorum? Esse, soluta.
      </p>
    </CardContent>
    <CardMeta>
      <CardMetaItem title="Posted Date">
        <time dateTime="2000-12-25">2 days ago</time>
      </CardMetaItem>
      <CardMetaItem title="Author">Grant Richmond</CardMetaItem>
    </CardMeta>
    <CardActions>
      <Button>Action 1</Button>
      <Button>Action 2</Button>
    </CardActions>
  </Card>
)

FullCard.args = {
  content: <p>This is a fully setup </p>,
}
