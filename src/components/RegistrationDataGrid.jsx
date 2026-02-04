import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Stack,
  Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RegistrationDataGrid = ({ rows = [], onEdit, onDelete }) => {
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.3 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.8 },

    {
      field: "workShift",
      headerName: "Work Shift",
      flex: 1.2,
      renderCell: (params) => {
        const ws = params?.row?.workShift;
        if (!ws) return <Chip label="N/A" size="small" />;

        return (
          <Stack direction="row" spacing={0.5}>
            {(Array.isArray(ws) ? ws : [ws]).map((s) => (
              <Chip
                key={s}
                label={s}
                size="small"
                sx={{
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                  fontWeight: 500,
                  fontSize: "12px"
                }}
              />
            ))}
          </Stack>
        );
      }
    },

    { field: "country", headerName: "Country", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#eef2ff",
              color: "#4338ca",
              "&:hover": { backgroundColor: "#e0e7ff" }
            }}
            onClick={() => onEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              "&:hover": { backgroundColor: "#fecaca" }
            }}
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <Box sx={{ height: 480, width: "100%" }}>
      <DataGrid
        rows={rows.map((r, i) => ({ id: r.id ?? i, ...r }))}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7, 10]}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          backgroundColor: "#ffffff",
          borderRadius: "12px",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f4f6fb",
            color: "#1f2937",
            fontSize: "13px",
            fontWeight: 600,
            borderBottom: "1px solid #e5e7eb"
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f1f1f1",
            fontSize: "13px",
            color: "#374151"
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9fafb"
          },

          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e5e7eb"
          }
        }}
      />
    </Box>
  );
};

export default RegistrationDataGrid;
