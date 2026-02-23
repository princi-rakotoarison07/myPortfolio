export function MainLayout ({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white/100 text-foreground " >
            {children}
        </div>
    )
}