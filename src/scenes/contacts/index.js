import MaterialTable from "material-table";
import Header from "../../components/Header";
import { Box, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  // DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [apartmentsData, setApartmentsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // fetching data from API
  useEffect(() => {
    fetch("http://localhost:3003/users")
      .then((response) => response.json())
      .then((data) => setApartmentsData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // console.log(apartmentsData);

  const columns = [
    {
      field: "id",
      title: "ID",
    },
    {
      field: "profile_pic",
      title: "Profile image",
      render: (rowData) => (
        <img
          src={rowData.profile_pic}
          alt="Profile"
          style={{ width: 50, borderRadius: 50 }}
        />
      ),
    },
    {
      field: "fullname",
      title: "Full Name",
    },
    {
      field: "phone_number",
      title: "Phone Number",
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "password",
      title: "Password",
      // render: () => <span>******</span>,
    },
  ];

  const handleAdd = (newData) => {
    fetch("http://localhost:3003/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Update the table data with the newly added row
        setApartmentsData([...apartmentsData, responseData]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdate = (newData, oldData) => {
    fetch(`http://localhost:3003/users/${oldData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Update the table data with the updated row
        const updatedData = [...apartmentsData];
        updatedData[updatedData.indexOf(oldData)] = responseData;
        setApartmentsData(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (oldData) => {
    fetch(`http://localhost:3003/users/${oldData.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the deleted row from the table data
        const updatedData = [...apartmentsData];
        updatedData.splice(updatedData.indexOf(oldData), 1);
        setApartmentsData(updatedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteSelected = () => {
    const deletePromises = selectedRows.map((row) => {
      return fetch(`http://localhost:3003/users/${row.id}`, {
        method: "DELETE",
      });
    });

    Promise.all(deletePromises)
      .then(() => {
        const updatedData = apartmentsData.filter(
          (item) => !selectedRows.find((row) => row.id === item.id)
        );
        setApartmentsData(updatedData);
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="CONTACTS"
          subtitle="List of Contacts for Future Reference"
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="10px"
        >
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </Button>
        </Box>
        <Box m="40px 0 0 0" height="80vh" width="76vw">
          <MaterialTable
            title="Users"
            data={apartmentsData}
            columns={columns}
            icons={{
              Add: AddBox,
              Check: Check,
              Clear: Clear,
              DetailPanel: ChevronRight,
              Delete: DeleteIcon,
              Edit: Edit,
              // Delete: () => <DeleteIcon style={{ color: "red" }} />,
              // Edit: () => <EditIcon style={{ color: "green" }} />,
              Export: SaveAlt,
              Filter: FilterList,
              FirstPage: FirstPage,
              LastPage: LastPage,
              NextPage: ChevronRight,
              PreviousPage: ChevronLeft,
              ResetSearch: Clear,
              Search: Search,
              SortArrow: ArrowDownward,
              ThirdStateCheck: Remove,
              ViewColumn: ViewColumn,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleAdd(newData);
                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleUpdate(newData, oldData);
                  resolve();
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleDelete(oldData);
                  resolve();
                }),
            }}
            options={{
              sorting: true,
              search: true,
              exportButton: true,
              actionsColumnIndex: -1,
              columnsButton: true,
              columnWidth: ["100px", "150px", "200px"],
              selection: true,
              rowStyle: (rowData) => ({
                backgroundColor: selectedRows.find(
                  (row) => row.tableData.id === rowData.tableData.id
                )
                  ? "#313b4f"
                  : colors.primary[400],
              }),
              cellStyle: {
                maxWidth: "150px", // Replace with your desired width value
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
              headerStyle: {
                backgroundColor: colors.blueAccent[700],
                color: "white",
                whiteSpace: "nowrap",
              },
              toolbarStyle: {
                backgroundColor: colors.blueAccent[700], // Change the background color of the table toolbar
              },
              paginationStyle: {
                backgroundColor: colors.blueAccent[700], // Change the background color of the table pagination
              },
              maxBodyHeight: "calc(100vh - 100px)", // Set the maximum height of the table body
            }}
            onSelectionChange={(rows) => setSelectedRows(rows)}
          />
        </Box>
      </Box>
    </>
  );
};

export default Contacts;

// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// // import { mockDataContacts } from "../../data/mockData";
// // import DeleteIcon from '@mui/icons-material/Delete';
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";
// import { useEffect, useState } from "react";

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3003/users")
//       .then((response) => response.json())
//       .then((data) => setUserData(data));
//   }, []);

//   console.log(userData);

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     // { field: "registrarId", headerName: "Registrar ID" },
//     {
//       field: "firstName",
//       headerName: "FirstName",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "lastName",
//       headerName: "LastName",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       // field: "phone",
//       field: "contact",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 1,
//     },
//     {
//       field: "city",
//       headerName: "City",
//       flex: 1,
//     },
//     // {
//     //   field: "zipCode",
//     //   headerName: "Zip Code",
//     //   flex: 1,
//     // },

//     // {
//     //   field: "accessLevel",
//     //   headerName: "Action",
//     //   flex: 1,
//     //   renderCell: ({ row: { access } }) => {
//     //     return (
//     //       <Box
//     //         width="60%"
//     //         m="0 auto"
//     //         p="5px"
//     //         display="flex"
//     //         justifyContent="center"
//     //         backgroundColor={colors.redAccent[500]}
//     //         borderRadius="4px"
//     //         sx={{ cursor: "pointer" }}
//     //       >
//     //         <button onClick={handleDeleteAll}>delete</button>
//     //       </Box>
//     //     );
//     //   },
//     // },
//   ];
//   // const [arrIds, setArrIds] = useState([]);
//   // const handleDeleteAll = () => {
//   //   // console.log(arrIds);

//   // };
//   return (
//     <Box m="20px">
//       <Header
//         title="CONTACTS"
//         subtitle="List of Contacts for Future Reference"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           checkboxSelection
//           // rows={mockDataContacts}
//           rows={userData}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//           // onRowSelectionModelChange={(dataIDs) => setArrIds(dataIDs)}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Contacts;
