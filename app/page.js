
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <h1>Hiii</h1>
        <Link href={'dashboard'}>
          <Button variant="outline">WELCOME</Button>
        </Link>
      </div>
    </>
  );
}
