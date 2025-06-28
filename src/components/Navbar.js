import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/add-transaction', label: 'Add' },
  { href: '/statistics', label: 'Statistics' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
