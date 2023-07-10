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
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
// import DeleteIcon from "@material-ui/icons/Delete";

const Ads = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [apartmentsData, setApartmentsData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // fetching data
  useEffect(() => {
    fetch("http://localhost:3003/apartments")
      .then((response) => response.json())
      .then((data) => setApartmentsData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // console.log(apartmentsData);

  const columns = [
    { field: "id", title: "ID" },
    { field: "user_id", title: "User_id" },
    {
      field: "space_type",
      title: "Space_Type",
    },
    {
      field: "description",
      title: "Description",
    },
    {
      field: "price",
      title: "price",
    },
    {
      field: "phone_number",
      title: "Phone",
    },
    {
      field: "email",
      title: "Email",
    },
    {
      field: "features",
      title: "features",
    },
    {
      field: "governorate",
      title: "governorate",
    },
    {
      field: "city",
      title: "city",
    },
    {
      field: "gender",
      title: "gender",
    },
    {
      field: "title",
      title: "title",
    },
    {
      field: "terms",
      title: "terms",
    },
    {
      field: "perice_per",
      title: "perice_per",
    },
    {
      field: "Iat",
      title: "Iat",
    },
    {
      field: "Ing",
      title: "Ing",
    },
  ];

  const handleAdd = (newData) => {
    fetch("http://localhost:3003/apartments", {
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
    fetch(`http://localhost:3003/apartments/${oldData.id}`, {
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
    fetch(`http://localhost:3003/apartments/${oldData.id}`, {
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
      return fetch(`http://localhost:3003/apartments/${row.id}`, {
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
          title="ADVERTISEMENTS"
          subtitle="List of Advertisements for Future Reference"
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
        <Box
          m="40px 0 0 0"
          height="80vh"
          // maxWidth="50vw"
          // minWidth="86vw"
          width="76vw"
        >
          <MaterialTable
            title="Advertisements Data"
            data={apartmentsData}
            columns={columns}
            icons={{
              Add: AddBox,
              Check: Check,
              Clear: Clear,
              Delete: DeleteOutline,
              DetailPanel: ChevronRight,
              Edit: Edit,
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
            // actions
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
              // filtering: true,
              // grouping: true,
              selection: true,
              rowStyle: (rowData) => ({
                backgroundColor: selectedRows.find(
                  (row) => row.tableData.id === rowData.tableData.id
                )
                  ? "#313b4f"
                  : colors.primary[400],
              }),

              cellStyle: {
                minWidth: "50px", // Replace with your desired width value
                maxWidth: "120px", // Replace with your desired width value
                overflow: "hidden",
                // textOverflow: "ellipsis",
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

export default Ads;
