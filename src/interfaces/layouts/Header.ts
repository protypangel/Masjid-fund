export default interface Header {
  phone: string,
  email: string,
  navItems: {
    label: string,
    path: string
  }[]
}