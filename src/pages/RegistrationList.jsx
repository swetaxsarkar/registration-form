import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegistrationDataGrid from "../components/RegistrationDataGrid";

const RegistrationList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("registrations")) || [];
    setData(stored);
  }, []);

  const handleEdit = (row) => {
    localStorage.setItem("editData", JSON.stringify(row));
    navigate("/registration");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this registration?")) return;

    const updated = data.filter(item => item.id !== id);
    setData(updated);
    localStorage.setItem("registrations", JSON.stringify(updated));
  };

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #e5e7eb"
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px"
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#111827" }}
          >
            Registration List
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280", mt: 0.5 }}
          >
            Manage registered users and their details
          </Typography>
        </Box>

        <CardContent>
          <TextField
            placeholder="Search users by name or email"
            size="small"
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: "#ffffff",
              borderRadius: "8px"
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <RegistrationDataGrid
            rows={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistrationList;
