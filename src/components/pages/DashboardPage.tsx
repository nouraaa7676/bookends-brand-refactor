import { useMemo } from "react";
import { Book } from "@/lib/books";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const TEAL_SHADES = [
  "#00A9BF", "#00899C", "#006B7A", "#004D58", "#008BA0",
  "#00C4DB", "#33D4E6", "#66DFF0",
];

interface DashboardPageProps {
  books: Book[];
}

const DashboardPage = ({ books }: DashboardPageProps) => {
  const genreData = useMemo(() => {
    const counts: Record<string, number> = {};
    books.forEach((b) => {
      counts[b.genre] = (counts[b.genre] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [books]);

  const authorData = useMemo(() => {
    const counts: Record<string, number> = {};
    books.forEach((b) => {
      counts[b.author] = (counts[b.author] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }));
  }, [books]);

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-secondary">
        📊 Library Map
      </h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Visualizing the treasures within our collection...
      </p>

      <Tabs defaultValue="genres">
        <TabsList className="mb-6 w-full justify-start gap-2 bg-accent p-1">
          <TabsTrigger value="genres" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🏷️ Genre Landscape
          </TabsTrigger>
          <TabsTrigger value="authors" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            ✍️ Top Authors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="genres">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bar Chart */}
            <div className="rounded-xl border-2 border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-base font-semibold text-secondary">
                Genre Distribution (Bar)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreData} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(187, 15%, 90%)" />
                  <XAxis type="number" tick={{ fill: "#003D4C", fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#003D4C", fontSize: 11 }} width={75} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid hsl(187, 15%, 90%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#00A9BF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="rounded-xl border-2 border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-base font-semibold text-secondary">
                Genre Distribution (Pie)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={true}
                  >
                    {genreData.map((_, i) => (
                      <Cell key={i} fill={TEAL_SHADES[i % TEAL_SHADES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="authors">
          <div className="rounded-xl border-2 border-border bg-card p-5">
            <h3 className="mb-4 font-heading text-base font-semibold text-secondary">
              Most Prolific Authors
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={authorData} margin={{ bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(187, 15%, 90%)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#003D4C", fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "#003D4C", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid hsl(187, 15%, 90%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#00A9BF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
