import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../../theme";
//  here replace this data with API or placeholderJson api
// import { mockDataTeam } from "../../data/mockData";
// import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/team")
      .then((response) => response.json())
      .then((data) => setTeamData(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  // const [arrIds, setArrIds] = useState([]);

  // const handleDeleteRows = (state, action) => {
  //   state.isFetch = false;
  //   state.isErr = false;
  //   const arrIds = action.payload;
  //   state.teamData = state.teamData.filter((teamData) =>
  //     arrIds.includes(teamData.id)
  //   );
  // };

  // const handleDeleteAll = () => {
  //   console.log(arrIds);
  //   // dispatchEvent(handleDeleteRows(arrIds))
  // };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
       
        <DataGrid
          checkboxSelection
          title='team table'
          // rows={mockDataTeam}
          rows={teamData}
          columns={columns}
          // components={{ Toolbar: GridToolbar }}
          // onRowSelectionModelChange={(dataIDs) => setArrIds(dataIDs)}
        />
      </Box>
    </Box>
  );
};

export default Team;
