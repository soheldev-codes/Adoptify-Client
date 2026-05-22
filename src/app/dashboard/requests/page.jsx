import { RequestTable } from "@/components/Dashbord/RequestTable";
import { Button, Card } from "@heroui/react";
import { div } from "framer-motion/client";
import Link from "next/link";
import React from "react";
import { FaCalendar } from "react-icons/fa";

const RequestPage = () => {
  const request = true;

  return (
    <div>
      {!request && (
        <div>
          <h2>My Request</h2>
          <Card className="flex flex-col items-center py-20">
            <FaCalendar className="text-2xl" />
            <p className="text-xl font-semibold">
              You haven't submitted any adoption requests yet.
            </p>
            <Link href={"/pets"}>
              <Button variant="outline">Browse Pet</Button>
            </Link>
          </Card>
        </div>
      )}

      <RequestTable />
    </div>
  );
};

export default RequestPage;
