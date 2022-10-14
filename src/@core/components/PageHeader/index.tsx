import { ActionIcon, Group, Text, Title } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  subTitle?: string | null
  targetURL?: string | null
}

function PageHeader(props: PageHeaderProps) {
  const { title, subTitle, targetURL } = props

  return (
    <Group mb="md" spacing="sm">
      {targetURL && (
        <Link href={targetURL} passHref>
          <ActionIcon component="a">
            <IconArrowLeft size={18} />
          </ActionIcon>
        </Link>
      )}

      <Title size="h3">{title}</Title>

      {subTitle && <Text weight={400}>{subTitle}</Text>}
    </Group>
  )
}

export default PageHeader
