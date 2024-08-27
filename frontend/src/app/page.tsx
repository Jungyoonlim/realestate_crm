import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Real Estate CRM</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/dashboard" className="p-4 border rounded-lg hover:bg-gray-100 text-center">
          Dashboard
        </Link>
        <Link href="/login" className="p-4 border rounded-lg hover:bg-gray-100 text-center">
          Login
        </Link>
        <Link href="/messages" className="p-4 border rounded-lg hover:bg-gray-100 text-center">
          Messages
        </Link>
        <Link href="/subscription" className="p-4 border rounded-lg hover:bg-gray-100 text-center">
          Subscription
        </Link>
      </div>
    </main>
  );
}