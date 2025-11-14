interface PageHeaderProps {
     title?: string;
     description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
     if (!title && !description) return null;

     return (
          <header className="mb-4">
               {title && (
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-text-primary-dark">{title}</h1>
               )}
               {description && <p className="text-gray-500 text-base font-normal leading-normal">{description}</p>}
          </header>
     );
}
