import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User2 } from "lucide-react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { User } from "@/lib/types/user"

interface UserProfileProps {
  user: User
}

export default function UserProfileCard({ user }: UserProfileProps) {
  // Get initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="w-full max-w-md relative">
      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pt-14 sm:pt-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback className="text-lg">{initials || <User2 className="h-6 w-6" />}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <Badge variant="secondary" className="w-fit">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
            {user.email}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

