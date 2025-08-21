export interface Header {
  isActive: (path: string) => boolean,
  phone: string,
  email: string,
  navItems: {
    label: string,
    path: string
  }[]
}