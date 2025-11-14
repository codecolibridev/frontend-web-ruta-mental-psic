interface PageHeaderProps {
     title?: string;
     description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
     if (!title && !description) return null;

     return (
          <header className="mb-4">
               {title && <h1 className="text-2xl font-semibold">{title}</h1>}
               {description && <p className="text-sm text-slate-600">{description}</p>}
          </header>
     );
}
