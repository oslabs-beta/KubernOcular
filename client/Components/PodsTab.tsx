import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function NamespaceDropDown(props: {setRows: void}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [namespaces, setNamespaces] = React.useState<JSX.Element[]>([]);
  const [selectedNamespace, setSelectedNamespace] = React.useState<string>('');

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<unknown>, namespace: string): void => {
    setAnchorEl(null);
    if (namespace !== 'backdropClick') setSelectedNamespace(namespace);
  };

  React.useEffect((): void => {
    const namespaceArr: string[] = [];
    const fetchNamespaces = async () => {
        const allNamespaces = await axios.get('../api/cluster/namespaces');
        const tempArray: JSX.Element[] = [];
        for (const namespace of allNamespaces.data) {
          namespaceArr.push(namespace);
          tempArray.push(
            <MenuItem onClick={(event) => handleClose(event, namespace)}>{namespace}</MenuItem>
          )
        }
        setNamespaces(tempArray);
    };
    fetchNamespaces()
    .then(() => setSelectedNamespace(namespaceArr[0]));
  }, [])

  React.useEffect((): void => {
    const fetchPods = async () => {
      const allPodData = await axios.get(`/api/pod/instant?namespace=${selectedNamespace}`);
      const cpuData = allPodData.data.cpu;
      const memData = allPodData.data.mem;
      const newRows: any = {};
      for (let i = 0; i < cpuData.length; i++) {
        const podName = cpuData[i].metric.pod;
        const cpuMetric = cpuData[i].value[1];
        const memMetric = memData[i].value[1];
        if (!newRows[podName]) newRows[podName] = createData(podName, cpuMetric, memMetric);
      }
      props.setRows(Object.values(newRows));
    };
    fetchPods();
  }, [selectedNamespace])

  return (
    <div>
      <Button
        id="basic-button"
        color="secondary"
        variant="outlined"
        sx={{ mb: 2.5 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Namespace: {selectedNamespace}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {namespaces}
      </Menu>
    </div>
  );
}

interface Data {
  cpu: number;
  mem: number;
  name: string;
}

function createData(
  name: string,
  cpu: number,
  mem: number,
): Data {
  return {
    name,
    cpu,
    mem,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Pod Name',
  },
  {
    id: 'cpu',
    numeric: true,
    disablePadding: false,
    label: 'CPU Usage',
  },
  {
    id: 'mem',
    numeric: true,
    disablePadding: false,
    label: 'Memory Usage',
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
      </TableCell>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
  );
}

const EnhancedTableToolbar = () => {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
    <Typography
      sx={{ flex: '1 1 100%', ml: 1, }}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      Pods
    </Typography>
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('cpu');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([createData('[empty]', 0 , 0)]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    navigate(`../poddisplay/?podname=${name}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        
        <Paper
        sx={{ width: '100%', mb: 2 }}
        >
          <EnhancedTableToolbar />
          <div style={{display: 'flex', justifyContent: 'right', marginTop: -50, marginRight: 15 }}><NamespaceDropDown setRows={setRows}/></div>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                      >
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.cpu}</TableCell>
                        <TableCell align="right">{row.mem}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch
          color="secondary"
          checked={dense}
          onChange={handleChangeDense} />}
          label="compact display"
          sx={{ ml: 3 }}
        />
      </Box>
    </div>
  );
}