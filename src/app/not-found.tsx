import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="font-semibold">404</h1>
        <p className="text-gray-600">
          Looks like you've ventured into the unknown digital realm.
        </p>
        <Button variant="solid" color="default">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
