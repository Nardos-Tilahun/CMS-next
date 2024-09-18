import { Resources } from './resources'

export default function ResourcePage({ params }: { params: { id: string } }) {
  return <Resources params={params} />
}
