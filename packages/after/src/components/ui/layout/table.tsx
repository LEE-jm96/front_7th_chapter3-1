import * as React from "react"
import { useState, useEffect } from 'react';
import { Badge } from '../feedback/badge';
import { Button } from '../actions/button';
import { cn } from "@/lib/utils"
import type { TableProps } from "./types"

// shadcn Table 기본 컴포넌트들
function TableBase({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ 
  className, 
  onClick,
  ...props 
}: React.ComponentProps<"tr"> & { onClick?: () => void }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

// 기존 props 구조를 유지하는 Table 컴포넌트
export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return newDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
      : tableData;

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({ key, header: key, width: undefined }))
      : []);

  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === 'status') {
        const badgeStatus =
          value === 'active' ? 'published' : value === 'inactive' ? 'draft' : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const type =
          value === 'development'
            ? 'primary'
            : value === 'design'
              ? 'info'
              : value === 'accessibility'
                ? 'danger'
                : 'secondary';
        return (
          <Badge type={type} pill>
            {value}
          </Badge>
        );
      }
      if (columnKey === 'status') {
        return <Badge status={value} showIcon />;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button size="sm" variant="success" onClick={() => onPublish?.(row.id)}>
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button size="sm" variant="secondary" onClick={() => onArchive?.(row.id)}>
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button size="sm" variant="primary" onClick={() => onRestore?.(row.id)}>
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="table-container">
      {searchable && (
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '300px',
            }}
          />
        </div>
      )}

      <TableBase className={cn(
        striped && "table-striped",
        bordered && "table-bordered",
        hover && "table-hover"
      )}>
        <TableHeader>
          <TableRow>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(sortable && "cursor-pointer")}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableBase>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            이전
          </button>
          <span style={{ padding: '6px 12px' }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              background: 'white',
              borderRadius: '4px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

// shadcn 기본 컴포넌트들도 export
export {
  TableBase as TableBase,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
}

