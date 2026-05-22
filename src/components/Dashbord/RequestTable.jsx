"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Table } from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function RequestTable() {
  const [adoptionData, setAdoptionData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchPets = async () => {
      if (!user?.email) return;
      setisLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-requests/${user?.email}`,
        );
        const data = await res.json();
        setAdoptionData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };

    fetchPets();
    fetchPets();
  }, [user?.email]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmed = window.confirm("  sure delete It..");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/requests/${id}`,
        { method: "DELETE" },
      );

      const result = await res.json();

      if (result.deletedCount > 0) {
        setAdoptionData((prev) =>
          prev.filter((item) => item._id.toString() !== id.toString()),
        );
        toast.success("Successfully deleted! 🗑️");
      } else {
        toast("Delete failed. Item not found.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Adoption Requests">
          <Table.Header>
            <Table.Column className="font-bold" isRowHeader>
              Pet Name
            </Table.Column>
            <Table.Column className="font-bold">Request Date</Table.Column>
            <Table.Column className="font-bold">Pickup Date</Table.Column>
            <Table.Column className="font-bold">Status</Table.Column>
            <Table.Column className="font-bold">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              adoptionData.map((adoption) => (
                <Table.Row key={adoption._id}>
                  <Table.Cell>{adoption.pet_name}</Table.Cell>
                  <Table.Cell>{adoption.created_at?.split("T")[0]}</Table.Cell>
                  <Table.Cell>{adoption.adoption_date}</Table.Cell>
                  <Table.Cell>{adoption.status}</Table.Cell>
                  <Table.Cell className="flex items-center gap-2">
                    <Button size="sm">See</Button>
                    <Button
                      size="sm"
                      variant="danger"
                      isLoading={deletingId === adoption._id}
                      isDisabled={deletingId === adoption._id}
                      onPress={() => handleDelete(adoption._id)}
                    >
                      {deletingId === adoption._id ? "Deleting..." : "Delete"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
