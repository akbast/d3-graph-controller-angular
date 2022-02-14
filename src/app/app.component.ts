import { Component, ViewChild } from '@angular/core';
import { GraphController, defineGraphConfig, defineNode, defineLink, defineGraph, GraphLink, GraphNode } from 'd3-graph-controller';

export type CustomType = 'primary' | 'secondary'

export interface CustomNode extends GraphNode<CustomType> {
  radius: number
}


export interface CustomLink extends GraphLink<CustomType, CustomNode> {
  length: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3-graph-controller-angular';

    // Any HTMLDivElement can be used as the container
    @ViewChild("graph", { static: false }) container!: HTMLDivElement; 

    ngOnInit(): void {
      
    }
    
    controller!: GraphController<CustomType, CustomNode, CustomLink>
  
    ngAfterViewInit(): void {
      console.log(this.container)
  
  
      const config = defineGraphConfig<CustomType, CustomNode, CustomLink>({
        nodeRadius: (node: CustomNode) => node.radius,
        simulation: {
          forces: {
            centering: {
              strength: (node: CustomNode) => (node.type === 'primary' ? 0.5 : 0.1),
            },
            link: {
              length: (link: CustomLink) => link.length,
            },
          },
        },
      })
    
    
      const a = defineNode<CustomType, CustomNode>({
        id: 'a',
        type: 'primary',
        isFocused: false,
        color: 'green',
        label: {
          color: 'black',
          fontSize: '1rem',
          text: 'A',
        },
        radius: 64,
      })
    
      const b = defineNode<CustomType, CustomNode>({
        id: 'b',
        type: 'secondary',
        isFocused: false,
        color: 'blue',
        label: {
          color: 'black',
          fontSize: '1rem',
          text: 'B',
        },
        radius: 32,
      })
    
      const aToB = defineLink<CustomType, CustomNode, CustomNode, CustomLink>({
        source: a,
        target: b,
        color: 'red',
        label: {
          color: 'black',
          fontSize: '1rem',
          text: '128',
        },
        length: 128,
      })
    
      const graph = defineGraph<CustomType, CustomNode, CustomLink>({
        nodes: [a, b],
        links: [aToB],
      })
  
      this.controller = new GraphController(this.container, graph, config)
    }
}
