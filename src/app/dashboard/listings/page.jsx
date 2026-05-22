"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit2,
  FiEye,
  FiTrash2,
  FiUsers,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { PiPawPrint } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";

const SPECIES = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Fish",
  "Hamster",
  "Turtle",
  "Other",
];
const GENDERS = ["Male", "Female"];
const VACCINATION = ["Vaccinated", "Not Vaccinated", "Partially Vaccinated"];

// ── Status Badge ─────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending: { bg: "#FEF3C7", color: "#92400E", label: "Pending" },
    approved: { bg: "#D1FAE5", color: "#065F46", label: "Approved" },
    rejected: { bg: "#FEE2E2", color: "#991B1B", label: "Rejected" },
  };
  const s = map[status?.toLowerCase()] ?? map.pending;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 10px",
        borderRadius: 99,
        letterSpacing: "0.03em",
      }}
    >
      {s.label}
    </span>
  );
}

// ── Requests Modal ───────────────────────────────────────────────
function RequestsModal({ pet, onClose }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/requests/${pet._id}`,
        );
        const data = await res.json();
        setRequests(data);
      } catch {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [pet._id]);

  const handleStatus = async (requestId, status) => {
    setUpdatingId(requestId);
    try {
      const route = status === "approved" ? "approve" : "reject";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${route}/${requestId}`,
        { method: "PATCH", headers: { "Content-Type": "application/json" } },
      );
      const result = await res.json();
      if (result.message) {
        if (status === "approved") {
          setRequests((prev) =>
            prev.map((r) =>
              r._id === requestId
                ? { ...r, status: "approved" }
                : { ...r, status: "rejected" },
            ),
          );
        } else {
          setRequests((prev) =>
            prev.map((r) =>
              r._id === requestId ? { ...r, status: "rejected" } : r,
            ),
          );
        }
        toast.success(result.message);
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 560,
          maxHeight: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Adoption Requests
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
              {pet.pet_name} · {requests.length} request
              {requests.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={onClose} style={closeBtn}>
            <FiX />
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "16px 24px", flex: 1 }}>
          {loading ? (
            <p
              style={{
                textAlign: "center",
                color: "#94A3B8",
                padding: "40px 0",
              }}
            >
              Loading...
            </p>
          ) : requests.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#94A3B8",
                padding: "40px 0",
              }}
            >
              No requests yet
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {requests.map((req) => {
                const isSettled =
                  req.status === "approved" || req.status === "rejected";
                return (
                  <div
                    key={req._id}
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: 14,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#0F172A",
                          }}
                        >
                          {req.requester_name ?? req.user_name ?? "Unknown"}
                        </p>
                        <p
                          style={{
                            margin: "2px 0 0",
                            fontSize: 12,
                            color: "#64748B",
                          }}
                        >
                          {req.user_email ?? req.email}
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 12,
                            color: "#94A3B8",
                          }}
                        >
                          Pickup: {req.adoption_date} ·{" "}
                          {req.created_at?.split("T")[0]}
                        </p>
                      </div>
                      <StatusBadge status={req.status ?? "pending"} />
                    </div>

                    {!isSettled && (
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button
                          disabled={updatingId === req._id}
                          onClick={() => handleStatus(req._id, "approved")}
                          style={actionBtn(
                            "#D1FAE5",
                            "#065F46",
                            "#6EE7B7",
                            updatingId === req._id,
                          )}
                        >
                          <FiCheck size={14} /> Approve
                        </button>
                        <button
                          disabled={updatingId === req._id}
                          onClick={() => handleStatus(req._id, "rejected")}
                          style={actionBtn(
                            "#FEE2E2",
                            "#991B1B",
                            "#FCA5A5",
                            updatingId === req._id,
                          )}
                        >
                          <FiX size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Update Pet Modal ─────────────────────────────────────────────
function UpdatePetModal({ pet, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pet_name: pet.pet_name ?? "",
    species: pet.species ?? "",
    breed: pet.breed ?? "",
    age: pet.age ?? "",
    gender: pet.gender ?? "",
    vaccination_status: pet.vaccination_status ?? "",
    image_url: pet.image_url ?? "",
    health_status: pet.health_status ?? "",
    location: pet.location ?? "",
    adoption_fee: pet.adoption_fee ?? "",
    description: pet.description ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pets/${pet._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await res.json();
      if (result.modifiedCount > 0) {
        toast.success("Pet updated!");
        onUpdated(pet._id, formData);
        onClose();
      } else {
        toast.error("Nothing changed.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 580,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#0F172A",
            }}
          >
            Update Pet
          </p>
          <button onClick={onClose} style={closeBtn}>
            <FiX />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label style={labelStyle}>Pet Name *</label>
              <input
                name="pet_name"
                value={formData.pet_name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Species *</label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select</option>
                {SPECIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label style={labelStyle}>Breed *</label>
              <input
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Age *</label>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label style={labelStyle}>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={inputStyle}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Vaccination</label>
              <select
                name="vaccination_status"
                value={formData.vaccination_status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select</option>
                {VACCINATION.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Image URL *</label>
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="https://..."
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label style={labelStyle}>Health Status</label>
              <input
                name="health_status"
                value={formData.health_status}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Adoption Fee ($)</label>
            <input
              type="number"
              name="adoption_fee"
              value={formData.adoption_fee}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 0",
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? "Updating..." : "Update Pet"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Pet Card ─────────────────────────────────────────────────────
function PetCard({ pet, onDelete, onOpenRequests, onOpenEdit }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`"${pet.pet_name}" delete করতে চান?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pets/${pet._id}`,
        { method: "DELETE" },
      );
      const result = await res.json();
      if (result.deletedCount > 0) {
        toast.success("Pet deleted!");
        onDelete(pet._id);
      } else {
        toast.error("Delete failed.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setDeleting(false);
    }
  };

  const isAdopted = pet.adopted === true;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #E2E8F0",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          background: "#F1F5F9",
        }}
      >
        {pet.image_url ? (
          <Image
            src={pet.image_url}
            alt={pet.pet_name}
            width={400}
            height={400}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#CBD5E1",
              fontSize: 48,
            }}
          >
            <PiPawPrint />
          </div>
        )}
        {isAdopted && (
          <span
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "#F59E0B",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 99,
            }}
          >
            Adopted
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 16,
              color: "#0F172A",
            }}
          >
            {pet.pet_name}
          </p>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 15,
              color: "#6366F1",
            }}
          >
            ${pet.adoption_fee ?? 0}
          </p>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "#94A3B8" }}>
          {pet.species} · {pet.breed}
        </p>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => onOpenRequests(pet)}
            style={{
              flex: 1,
              padding: "8px 0",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: "#475569",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EEF2FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F8FAFC")}
          >
            <FiUsers size={14} /> Requests
          </button>

          {/* ✅ Edit — modal  */}
          <button
            onClick={() => onOpenEdit(pet)}
            style={iconBtnStyle("#F8FAFC", "#475569")}
          >
            <FiEdit2 size={15} />
          </button>

          {/* View */}
          <Link href={`/pets/${pet._id}`}>
            <button style={iconBtnStyle("#F8FAFC", "#475569")}>
              <FiEye size={15} />
            </button>
          </Link>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={iconBtnStyle("#FEF2F2", "#DC2626")}
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Styles ────────────────────────────────────────────────
const iconBtnStyle = (bg, color) => ({
  width: 36,
  height: 36,
  background: bg,
  border: "1px solid #E2E8F0",
  borderRadius: 10,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color,
  flexShrink: 0,
  transition: "opacity 0.15s",
});

const closeBtn = {
  background: "#F1F5F9",
  border: "none",
  borderRadius: 10,
  width: 36,
  height: 36,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748B",
  fontSize: 18,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #E2E8F0",
  borderRadius: 10,
  fontSize: 14,
  color: "#0F172A",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#475569",
  marginBottom: 6,
};

const actionBtn = (bg, color, border, disabled) => ({
  flex: 1,
  padding: "7px 0",
  background: bg,
  color,
  border: `1px solid ${border}`,
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 13,
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  opacity: disabled ? 0.6 : 1,
  transition: "opacity 0.2s",
});

// ── Stat Card ────────────────────────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: "20px 24px",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#0F172A" }}>
        {value}
      </p>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94A3B8" }}>
        {label}
      </p>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────
export default function MyListingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null); // requests modal
  const [editingPet, setEditingPet] = useState(null); // edit modal

  useEffect(() => {
    if (!user?.email) return;
    const fetchPets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/my-listings/${user.email}`,
        );
        const data = await res.json();
        setPets(data);
      } catch {
        toast.error("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [user?.email]);

  const handleDelete = (id) => {
    setPets((prev) => prev.filter((p) => p._id.toString() !== id.toString()));
  };

  const handleUpdated = (id, updatedData) => {
    setPets((prev) =>
      prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p)),
    );
  };

  const totalListings = pets.length;
  const adopted = pets.filter((p) => p.adopted === true).length;
  const available = totalListings - adopted;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 24px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <h1
          style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0F172A" }}
        >
          My Listings
        </h1>
        <Link href="/dashboard/add-pet">
          <button
            style={{
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "10px 20px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <FiPlus size={17} /> Add Pet
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard label="Total Listings" value={totalListings} />
        <StatCard label="Available" value={available} />
        <StatCard label="Adopted" value={adopted} />
      </div>

      {/* Pet Grid */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#94A3B8", paddingTop: 60 }}>
          Loading...
        </p>
      ) : pets.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94A3B8", paddingTop: 60 }}>
          No pets listed yet. Add your first pet!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {pets.map((pet) => (
            <PetCard
              key={pet._id}
              pet={pet}
              onDelete={handleDelete}
              onOpenRequests={setSelectedPet}
              onOpenEdit={setEditingPet}
            />
          ))}
        </div>
      )}

      {/* Requests Modal */}
      {selectedPet && (
        <RequestsModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}

      {/* Edit Modal */}
      {editingPet && (
        <UpdatePetModal
          pet={editingPet}
          onClose={() => setEditingPet(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
