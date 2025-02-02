import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  panelOpenState: boolean = false;

  questions: any[] = [
    {
      question: '¿Qué equipo necesito para cada evento?',
      answer: 'En CEMAC, contamos con 7 disciplinas, cada guía indica lo necesario para la excursión especifica pero de forma general es recomendable:Vestimenta: botas de sendero y/o zapatos de agua dependiendo la actividad, sopa deportiva de manga larga, gorra, BUFF rompevientos, ropa de cambio (evitar ropa de camuflaje). Básicos y provisiones: agua 3 Lt, snacks y refrigerio, bloqueador solar, repelente, bolsa seca, manta térmica, lampara frontal, baterías extra, botiquín personal, gel antibacterial, cubrebocas. Para resolver tus dudas de primera mano, habla con el coordinador o guía de cada excursión o con el secretario de excursiones, vía telefónica antes de la salida.',
      description: ''
    },
    {
      question: '¿De donde parten las excursiones?',
      answer: 'Estará indicado en los detalles de la excursión, pero recuerda coordinarse con el guía para detalles, o resolver dudas.',
      description: ''
    },
    {
      question: '¿Las excursiones tienen costo?',
      answer: 'No, el CEMAC es una asociación civil, sin fines de lucro. Se incurren en gastos personales y de transporte.',
      description: ''
    },
    {
      question: '¿Cuales son los medios de transporte?',
      answer: 'En autos particulares ó en camionetas de renta, según sea el destino y el número de participantes.',
      description: ''
    },
    {
      question: '¿Cuento con seguro de gastos médicos?',
      answer: 'No por parte de nosotros. De acuerdo al Art. 7o: Siendo el CEMAC Veracruz una Institución netamente deportiva y no lucrativa, no se hace responsable de ningún accidente que pudiera ocurrir a sus socios o invitados durante las actividades deportivas o sociales del mismo, cualquiera que sea el sitio donde se lleven a cabo.',
      description: ''
    },
    {
      question: '¿Cómo puedo inscribirme al CEMAC Sección Veracruz - Boca del Río, A.C.?',
      answer: 'Para ingresar con calidad de Socio, los interesados deberán cubrir : Llenar una solicitud para ser socio II. Firmar una carta de liberación de cualquier tipo de responsabilidad debidamente elaborada y firmada, por dos testigos, para los mayores de edad. IV. En caso de tratarse de un menor de edad presentar la carta de liberación mencionada en la fracción II, con el visto bueno del Padre o Tutor, quienes deberán de presentarse a firmar tal documento ante la presencia del Secretario General, y mostrar original y copia de una identificación oficial. V. Cubrir la cuota de inscripción, tres cuotas sociales mensuales y cualquier otro donativo, acordado por la Mesa Directiva VI. Haber leído los Estatus y Reglamentos del CEMAC Veracruz VII. Presentar un Certificado de Salud avalado por un Médico o Institución de Salud',
      description: ''
    }
  ];

}
