import { ActionIcon, Group, Text, Title } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'
import Link from 'next/link'

interface PageHeaderProps {
  title: string
  subTitle?: string | null
  targetURL?: string | null
  onBack?: () => void
}

function PageHeader(props: PageHeaderProps) {
  const { title, subTitle, targetURL, onBack } = props

  return (
    <Group mb="md" spacing="sm">
      {targetURL && (
        <Link href={targetURL} passHref>
          <ActionIcon component="a">
            <IconArrowLeft size={18} />
          </ActionIcon>
        </Link>
      )}

      {onBack && (
        <ActionIcon component="a" onClick={onBack}>
          <IconArrowLeft size={18} />
        </ActionIcon>
      )}

      <Title size="h3">{title}</Title>

      {subTitle && <Text weight={400}>{subTitle}</Text>}
    </Group>
  )
}

export default PageHeader
