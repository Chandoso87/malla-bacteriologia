"use client";
import { useState } from "react";
import classNames from "classnames";

type Ramo = {
  id: string;
  nombre: string;
  semestre: number;
  prerreq: string[];
};

const ramos: Ramo[] = [
  { id: "valores", nombre: "Taller de Vivencia de Valores", semestre: 1, prerreq: [] },
  { id: "quimica_gral", nombre: "Química General", semestre: 1, prerreq: [] },
  { id: "biocel", nombre: "Biología Celular", semestre: 1, prerreq: [] },
  { id: "mate1", nombre: "Matemática I", semestre: 1, prerreq: [] },
  { id: "constitucion", nombre: "Seminario de Constitución Política", semestre: 1, prerreq: [] },
  { id: "comunicacion", nombre: "Taller de Comunicación Oral y Escrita", semestre: 1, prerreq: [] },
  { id: "quimica_org", nombre: "Química Orgánica", semestre: 2, prerreq: ["quimica_gral"] },
  { id: "mate2", nombre: "Matemática II", semestre: 2, prerreq: ["mate1"] },
  { id: "morfo", nombre: "Morfofisiología", semestre: 2, prerreq: ["biocel"] },
  { id: "analisis_instrumental", nombre: "Análisis Instrumental", semestre: 2, prerreq: ["quimica_gral"] },
  { id: "genetica_micro", nombre: "Genética Microbiana", semestre: 2, prerreq: ["biocel"] },
  { id: "educacion_salud", nombre: "Educación para la Salud", semestre: 2, prerreq: [] },
  { id: "micro_gral", nombre: "Microbiología General", semestre: 3, prerreq: ["genetica_micro"] },
  { id: "inmuno_gral", nombre: "Inmunología General", semestre: 3, prerreq: ["morfo"] },
  { id: "estadistica", nombre: "Estadística Aplicada", semestre: 3, prerreq: ["mate2"] },
  { id: "metabolismo", nombre: "Metabolismo y Bioquímica Estructural", semestre: 3, prerreq: ["quimica_org"] },
  { id: "investigacion1", nombre: "Seminario de Investigación", semestre: 3, prerreq: [] },
  { id: "bioetica", nombre: "Bioética", semestre: 3, prerreq: [] },
  { id: "bacterio_gral", nombre: "Bacteriología General", semestre: 4, prerreq: ["micro_gral"] },
  { id: "hematologia_gral", nombre: "Hematología General", semestre: 4, prerreq: ["morfo"] },
  { id: "bioq_clinica", nombre: "Bioquímica Clínica", semestre: 4, prerreq: ["metabolismo"] },
  { id: "biomol", nombre: "Biología Molecular", semestre: 4, prerreq: ["genetica_micro"] },
  { id: "inmuno_clinica", nombre: "Inmunología Clínica", semestre: 4, prerreq: ["inmuno_gral"] },
  { id: "parasito_intestinal", nombre: "Parasitología Intestinal", semestre: 4, prerreq: ["morfo"] },
  { id: "bacterio_clinica", nombre: "Bacteriología Clínica", semestre: 5, prerreq: ["bacterio_gral"] },
  { id: "aps", nombre: "Atención Primaria en Salud", semestre: 5, prerreq: ["educacion_salud"] },
  { id: "hema_clinica", nombre: "Hematología Clínica", semestre: 5, prerreq: ["hematologia_gral"] },
  { id: "genetica_humana", nombre: "Genética Humana", semestre: 5, prerreq: ["biomol"] },
  { id: "parasito_tisular", nombre: "Parasitología Tisular", semestre: 5, prerreq: ["parasito_intestinal"] },
  { id: "quimica_esp", nombre: "Química Especial", semestre: 5, prerreq: ["analisis_instrumental"] },
  { id: "hema_esp", nombre: "Hematología Especial", semestre: 6, prerreq: ["hema_clinica"] },
  { id: "epidemiologia", nombre: "Epidemiología", semestre: 6, prerreq: ["estadistica"] },
  { id: "micologia", nombre: "Micología", semestre: 6, prerreq: ["micro_gral"] },
  { id: "banco_sangre", nombre: "Banco de Sangre y Medicina Transfusional", semestre: 6, prerreq: ["hema_esp"] },
  { id: "control_micro", nombre: "Control Microbiológico", semestre: 6, prerreq: ["quimica_esp"] },
  { id: "parasito_vet", nombre: "Parasitología Veterinaria", semestre: 6, prerreq: ["parasito_tisular"] },
  { id: "ambiente", nombre: "Ambiente, Agricultura y Desarrollo Sostenible", semestre: 6, prerreq: [] },
  { id: "salud_publica", nombre: "Salud Pública", semestre: 7, prerreq: ["epidemiologia"] },
  { id: "virologia", nombre: "Virología", semestre: 7, prerreq: ["micologia"] },
  { id: "metodologia", nombre: "Metodología de la Investigación", semestre: 7, prerreq: ["investigacion1"] },
  { id: "calidad_lab", nombre: "Aseguramiento de la Calidad en el Laboratorio", semestre: 7, prerreq: [] },
  { id: "electiva1", nombre: "Electiva de Profundización I", semestre: 7, prerreq: [] },
  { id: "correlacion", nombre: "Correlación Clínico-Patológica", semestre: 8, prerreq: ["bacterio_clinica"] },
  { id: "admin_salud", nombre: "Administración en Salud", semestre: 8, prerreq: [] },
  { id: "electiva2", nombre: "Electiva de Profundización II", semestre: 8, prerreq: ["electiva1"] },
  { id: "practica1", nombre: "Práctica Formativa (Lab. Clínico)", semestre: 9, prerreq: ["correlacion"] },
  { id: "practica2", nombre: "Práctica Formativa (Lab. Especializado)", semestre: 10, prerreq: ["practica1"] },
  { id: "grado", nombre: "Modalidad de Grado", semestre: 10, prerreq: ["metodologia"] }
];

export function MallaBacteriologia() {
  const [aprobados, setAprobados] = useState<string[]>([]);
  const toggle = (id: string) =>
    setAprobados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const isUnlocked = (r: Ramo) => r.prerreq.every((id) => aprobados.includes(id));

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {[...Array(10)].map((_, i) => {
        const semestre = i + 1;
        const list = ramos.filter((r) => r.semestre === semestre);
        return (
          <div key={semestre}>
            <h2 className="text-2xl font-semibold mb-4">Semestre {semestre}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((r) => {
                const aprobado = aprobados.includes(r.id);
                const unlocked = isUnlocked(r);
                return (
                  <div
                    key={r.id}
                    onClick={() => unlocked && toggle(r.id)}
                    className={classNames(
                      "p-3 rounded-md text-center font-medium cursor-pointer select-none transition",
                      aprobado && "line-through bg-green-100",
                      !unlocked && !aprobado && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {r.nombre}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}