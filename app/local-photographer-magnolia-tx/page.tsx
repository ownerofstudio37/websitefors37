import { redirect } from 'next/navigation'

export default function RedirectToCMS() {
  // Redirect users and bots to the CMS-managed Magnolia slug
  redirect('/magnolia')
}
