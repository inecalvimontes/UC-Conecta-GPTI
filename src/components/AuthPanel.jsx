/**
 * Columna izquierda decorativa compartida entre LoginPage y RegisterPage.
 * blobA / blobB: clases de color Tailwind (bg-*) para los dos blobs decorativos.
 */
export default function AuthPanel({ blobA = 'bg-green-mid', blobB = 'bg-accent' }) {
  return (
    <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12">
      {/* blobs */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-[46%] ${blobA} opacity-20 blur-2xl`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-[44%] ${blobB} opacity-25 blur-2xl`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-[48%] bg-app-surface opacity-[0.04]"
        aria-hidden
      />

      {/* logo */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-app-surface/10 ring-2 ring-app-surface/20 backdrop-blur-sm">
          <span className="text-4xl leading-none" role="img" aria-label="UConecta">
            🤝
          </span>
          {/* TODO: reemplazar con <img src="/logo-manos.png" alt="" className="h-12 w-12 object-contain" /> */}
        </div>
        <div>
          <p className="text-3xl font-extrabold tracking-tight text-app-surface">UConecta</p>
          <p className="mt-3 max-w-xs text-base font-medium leading-relaxed text-app-surface/70">
            Haz match con tu vida universitaria
          </p>
        </div>
      </div>
    </div>
  );
}
