"use client";
import * as XLSX from "xlsx";
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/app/(admin)/_components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/app/(admin)/_components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/(admin)/_components/ui/table";
import { Ausencia, Consultor, consultores } from "@/mocks/contracts";
import { useCallback } from "react";

const data: Consultor[] = consultores;

export const columns: ColumnDef<Consultor>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "nome",
        header: "Nome",
        cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
    },
    {
        accessorKey: "codigo_at",
        header: "Código Atividade",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("codigo_at")}</div>
        ),
    },
    {
        accessorKey: "modulo_sap",
        header: "Função",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("modulo_sap")}</div>
        ),
    },
    {
        accessorKey: "senioridade",
        header: "Senioridade",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("senioridade")}</div>
        ),
    },
    {
        accessorKey: "ausencia",
        header: "Ausência",
        cell: ({ row }) => {
            const ausencia = row.getValue("ausencia") as Ausencia | null;

            if (ausencia && ausencia.inicio && ausencia.fim && ausencia.tipo) {
                return (
                    <div className="capitalize">
                        {ausencia.inicio} - {ausencia.fim} ({ausencia.tipo})
                    </div>
                );
            }

            return <div>Sem ausência</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const consultor = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(consultor.id);
                            }}
                        >
                            Copie o ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(consultor.codigo_at);
                            }}
                        >
                            Copie o Código da Atividade
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

function generateFilename() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `Consultores_${year}-${month}-${day}_${hours}-${minutes}.xlsx`;
}

function exportToXlsx(selectedRows: Consultor[]) {
    const ws = XLSX.utils.json_to_sheet(selectedRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Consultors");

    const filename = generateFilename();

    XLSX.writeFile(wb, filename);
}

export function ConsultorsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [senioridadeFilter, setSenioridadeFilter] = React.useState<string | null>(null);
    const [ausenciaFilter, setAusenciaFilter] = React.useState(false);

    const filteredData = React.useMemo(() => {
        return data.filter((consultor) => {
            const matchesSenioridade = senioridadeFilter
                ? consultor.senioridade === senioridadeFilter
                : true;

            const matchesAusencia = ausenciaFilter
                ? consultor.ausencia && consultor.ausencia.inicio && consultor.ausencia.fim
                : true;

            return matchesSenioridade && matchesAusencia;
        });
    }, [senioridadeFilter, ausenciaFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleExport = useCallback(() => {
        const selectedRows = table.getRowModel().rows
            .filter((row) => row.getIsSelected())
            .map((row) => row.original);

        exportToXlsx(selectedRows);
    }, [table]);

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 py-4">
                <Input
                    placeholder="Procurar ID do Consultor..."
                    value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("id")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={ausenciaFilter}
                            onCheckedChange={(checked) => setAusenciaFilter(!!checked)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Somente com Ausência
                        </label>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Filtrar Senioridade <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup
                                value={senioridadeFilter || ""}
                                onValueChange={(value) => setSenioridadeFilter(value)}
                            >
                                <DropdownMenuRadioItem value={""}>Todos</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Ex">Expert (Ex)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Sr">Senior (Sr)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Pr">Pleno (Pr)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Jr">Junior (Jr)</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Bg">Estagiário (Bg)</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Indicadores <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
                        Exportar Selecionados
                    </Button>
                </div>
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="text-black"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linhas selecionadas.
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    );
}
